import * as React from 'react';
import { INVERSE_SCALE_CLASS_NAME } from './index';

interface InverseScaleProps {
  children: (opts: { className: string }) => React.ReactElement;
}

const InverseScale: React.FC<InverseScaleProps> = (props: InverseScaleProps) =>
  props.children({ className: INVERSE_SCALE_CLASS_NAME });

export default InverseScale;
