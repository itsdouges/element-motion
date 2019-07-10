import * as React from 'react';
import { INVERSE_TRANSLATE_CLASS_NAME } from './index';

interface InverseTranslateProps {
  children: (opts: { className: string }) => React.ReactElement;
}

const InverseTranslate: React.FC<InverseTranslateProps> = (props: InverseTranslateProps) =>
  props.children({ className: INVERSE_TRANSLATE_CLASS_NAME });

export default InverseTranslate;
