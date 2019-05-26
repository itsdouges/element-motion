/*
 Copyright 2016-present The Material Motion Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { ElementBoundingBox } from './dom';
import { Point } from './types';
import { bezier } from './bezier';

interface ControlPoints {
  point1: Point;
  point2: Point;
}

const zeroPoint = { x: 0, y: 0 };
const defaultMinArcAngle: number = 10.0;
const defaultMaxArcAngle: number = 90.0;

function rad2deg(radians: number): number {
  return (radians * 180.0) / Math.PI;
}

function deg2rad(degrees: number): number {
  return (degrees * Math.PI) / 180.0;
}

function distance(from: Point, to: Point): number {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

function normalized(point: Point): Point {
  const length = Math.sqrt(point.x * point.x + point.y * point.y);
  if (length < Number.EPSILON) {
    return zeroPoint;
  }
  return { x: point.x / length, y: point.y / length };
}

export function getControlPoints(from: Point, to: Point): ControlPoints {
  if (from.x === to.x && from.y === to.y) {
    return { point1: from, point2: to };
  }

  const minArcAngleRad = deg2rad(defaultMinArcAngle);

  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;

  const pointC = { x: to.x, y: from.y };
  const pointD = { x: (from.x + to.x) * 0.5, y: (from.y + to.y) * 0.5 };

  // Calculate side lengths
  const lenAB = distance(from, to);
  const lenAC = distance(from, pointC);
  const lenBC = distance(to, pointC);

  // Length AD is half length AB
  const lenAD = lenAB * 0.5;

  // Angle alpha
  let alpha: number;
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    alpha = Math.acos(lenAC / lenAB);
  } else {
    alpha = Math.acos(lenBC / lenAB);
  }

  // Alpha in degrees
  const alphaDeg = rad2deg(alpha);

  // Calculate point E
  const lenAE = lenAD / Math.cos(alpha);
  let pointE: Point;
  if (from.y === to.y) {
    pointE = pointD;
  } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
    const normalizedCFrom = normalized({ x: pointC.x - from.x, y: pointC.y - from.y });
    pointE = { x: from.x + normalizedCFrom.x * lenAE, y: from.y + normalizedCFrom.y * lenAE };
  } else {
    const normalizedCTo = normalized({ x: pointC.x - to.x, y: pointC.y - to.y });
    pointE = { x: to.x + normalizedCTo.x * lenAE, y: to.y + normalizedCTo.y * lenAE };
  }

  // Constrain DE to account for min/max arc segment
  const arcAngleClampDeg = Math.min(
    defaultMaxArcAngle,
    Math.max(defaultMinArcAngle, alphaDeg * 2.0)
  );

  const arcAngleClamp = deg2rad(arcAngleClampDeg);
  const alphaClamp = arcAngleClamp / 2.0;
  const maxLen = lenAD * Math.tan(alphaClamp);

  // Point E'
  let pointE2: Point;
  const vDE: Point = { x: pointE.x - pointD.x, y: pointE.y - pointD.y };
  const lenDE = distance(zeroPoint, vDE);

  let adjMinLen: number;
  if (defaultMinArcAngle > 0) {
    const tanMinArcAngleRad = Math.tan(minArcAngleRad);
    if (Math.abs(tanMinArcAngleRad) < Number.EPSILON) {
      // Protection against possible divide by zero - shouldn't happen in practice.
      adjMinLen = Number.MAX_SAFE_INTEGER;
    } else {
      const lenADOverTanMinArcAngleRad = lenAD / tanMinArcAngleRad;
      adjMinLen =
        Math.sqrt(lenAD * lenAD + lenADOverTanMinArcAngleRad ** 2) - lenADOverTanMinArcAngleRad;
    }
  } else {
    adjMinLen = 0;
  }
  if (Math.abs(deltaY) > Math.abs(deltaX)) {
    adjMinLen = Math.max(0, Math.min(lenDE, maxLen));
  }

  const newLen = Math.max(adjMinLen, Math.min(lenDE, maxLen));
  if (from.y === to.y) {
    pointE2 = { x: pointD.x, y: pointD.y + newLen };
  } else {
    const normalizedVDE = normalized(vDE);
    pointE2 = { x: pointD.x + normalizedVDE.x * newLen, y: pointD.y + normalizedVDE.y * newLen };
  }

  // Alpha'
  const lenDE2 = distance(pointD, pointE2);
  const alpha2 = Math.atan(lenDE2 / lenAD);

  // Alpha' degrees.
  const alpha2deg = rad2deg(alpha2);

  // Beta' degrees.
  const beta2deg = 90.0 - alpha2deg;

  // Beta'.
  const beta2 = deg2rad(beta2deg);

  // Radius'.
  const radius2 = lenAD / Math.cos(beta2);

  // Calculate the cubic bezier tangent handle length
  //
  // The following method is for a 90 degree arc
  //
  // tangent length = radius * k * scaleFactor
  //
  // radius: radius of our circle
  // kappa: constant with value of ~0.5522847498
  // scaleFactor: proportion of our arc to a 90 degree arc (arc angle / 90)
  const kappa: number = 0.5522847498;
  const radScaling: number = (alpha2deg * 2.0) / 90.0;
  const tangentLength = radius2 * kappa * radScaling;

  // Calculate the in tangent position in world coordinates
  // The tangent handle lies along the line between points B and E'
  // with magnitude of tangentLength
  const vBEnorm = normalized({ x: pointE2.x - to.x, y: pointE2.y - to.y });
  const inTangent: Point = {
    x: to.x + vBEnorm.x * tangentLength,
    y: to.y + vBEnorm.y * tangentLength,
  };

  // Calculate the out tangent position in world coordinates
  // The tangent handle lies along the line between points A and E'
  // with magnitude of tangentLength
  const vAEnorm = normalized({ x: pointE2.x - from.x, y: pointE2.y - from.y });
  const outTangent = {
    x: from.x + vAEnorm.x * tangentLength,
    y: from.y + vAEnorm.y * tangentLength,
  };

  return { point1: outTangent, point2: inTangent };
}

export function arcMove(origin: ElementBoundingBox, destination: ElementBoundingBox) {
  const startPoint = { x: origin.location.left, y: origin.location.top };
  const endPoint = { x: destination.location.left, y: destination.location.top };
  const controlPoints = getControlPoints(startPoint, endPoint);
  const getBezierPoint = bezier(startPoint, endPoint, controlPoints.point1, controlPoints.point2);
  const pointsAccuracy = 1 / 100;
  const points = [];

  for (let time = 0; time < 1; time += pointsAccuracy) {
    points.push(getBezierPoint(time));
  }

  return points;
}
