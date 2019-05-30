import * as React from 'react';
import * as Common from '../index';
import * as Styled from './styled';

const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

export const createMoveExamples = (options: { useDistinctEnd: boolean; namePrefix: string }) => (
  Motion: React.ComponentType<{ name: string; in?: boolean }>,
  MotionComponent: React.ComponentType<{
    [key: string]: any;
    children: (opts: any) => React.ReactNode;
  }>
) => ({
  Default: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  WithAbsolutePositioning: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Styled.Padding />
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.RelativeListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.AbsoluteListItem
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
          <Styled.Padding />
        </div>
      )}
    </Common.Toggler>
  ),

  WithFixedPositioning: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Styled.Padding />
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.RelativeListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.FixedListItem
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
          <Styled.Padding />
        </div>
      )}
    </Common.Toggler>
  ),

  WithMargin: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    margin={100}
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToLarge: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    size={2}
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToLargeWithMargin: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem margin={20} ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    size={2}
                    ref={ref}
                    margin={50}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToRectangle: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    width={2}
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToCircle: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    borderRadius="50%"
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  FromOffscreen: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <div>
              <Styled.Padding />
              <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
                <MotionComponent>
                  {({ ref, ...props }) => (
                    <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                  )}
                </MotionComponent>
              </Motion>
            </div>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToOffscreen: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <div>
              <Styled.Padding />
              <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
                <MotionComponent>
                  {({ ref, ...props }) => (
                    <Styled.ListItemFloatingRight
                      ref={ref}
                      onClick={() => toggle()}
                      alternate={options.useDistinctEnd}
                      {...props}
                    />
                  )}
                </MotionComponent>
              </Motion>
            </div>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToIndiscriminateSize: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          ) : (
            <Styled.ContainerFloatingRight>
              <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
                <MotionComponent>
                  {({ ref, ...props }) => (
                    <Styled.ListItemFillSpace
                      ref={ref}
                      onClick={() => toggle()}
                      alternate={options.useDistinctEnd}
                      {...props}
                    />
                  )}
                </MotionComponent>
              </Motion>
            </Styled.ContainerFloatingRight>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  FromLongPage: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Styled.LongContainer>
              <RestoreScrollOnMount />
              <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
                <MotionComponent>
                  {({ ref, ...props }) => (
                    <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                  )}
                </MotionComponent>
              </Motion>
            </Styled.LongContainer>
          ) : (
            <Motion name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  FromAlwaysMounted: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Motion name={`${options.namePrefix}-default`} in={!shown}>
            <MotionComponent>
              {({ ref, style, ...props }) => (
                <Styled.ListItem
                  ref={ref}
                  onClick={() => toggle()}
                  // !! CURRENT LIMITATION ALERT !!
                  // Consumers need to set their own opacity depending if it's shown or not.
                  style={{ ...style, opacity: shown ? 0 : style.opacity }}
                  {...props}
                />
              )}
            </MotionComponent>
          </Motion>

          {shown && (
            <Motion name={`${options.namePrefix}-default`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </MotionComponent>
            </Motion>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  ToAlwaysMounted: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown && (
            <Motion name={`${options.namePrefix}-default`}>
              <MotionComponent>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </MotionComponent>
            </Motion>
          )}

          <Motion name={`${options.namePrefix}-default`} in={!!shown}>
            <MotionComponent>
              {({ ref, style, ...props }) => (
                <Styled.ListItemFloatingRight
                  ref={ref}
                  onClick={() => toggle()}
                  alternate={options.useDistinctEnd}
                  // !! CURRENT LIMITATION ALERT !!
                  // Consumers need to set their own opacity depending if it's shown or not.
                  style={{ ...style, opacity: !shown ? 0 : style.opacity }}
                  {...props}
                />
              )}
            </MotionComponent>
          </Motion>
        </div>
      )}
    </Common.Toggler>
  ),
});
