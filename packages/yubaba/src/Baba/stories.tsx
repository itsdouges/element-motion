import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Baba from './index';
import Noop from '../animations/Noop';

interface BabaProfilerProps {
  iterations: number;
}

interface BabaProfilerState {
  start: boolean;
  profiling: boolean;
  finished: boolean;
}

class BabaProfiler extends React.Component<BabaProfilerProps, BabaProfilerState> {
  state: BabaProfilerState = BabaProfiler.getDefaultState();

  curStart: number = -1;

  curEnd: number = -1;

  results: number[] = [];

  iteration: number = 1;

  onNextIteration = () => {
    this.iteration += 1;

    this.setState(
      {
        start: false,
      },
      () => {
        if (this.iteration < this.props.iterations) {
          this.curEnd = Date.now();
          this.results.push(this.curEnd - this.curStart);
          this.curStart = Date.now();

          this.setState({
            start: true,
          });
        } else {
          this.curEnd = Date.now();
          this.results.push(this.curEnd - this.curStart);

          this.setState({
            finished: true,
          });
        }
      }
    );
  };

  start = () => {
    this.curStart = Date.now();

    this.setState(
      {
        profiling: true,
      },
      () => {
        this.setState({
          start: true,
        });
      }
    );
  };

  reset = () => {
    this.curStart = -1;
    this.curEnd = -1;
    this.results = [];
    this.iteration = 1;
    this.setState(BabaProfiler.getDefaultState(), this.start);
  };

  static getDefaultState() {
    return {
      start: false,
      profiling: false,
      finished: false,
    };
  }

  getAverage() {
    return Math.ceil(this.results.reduce((val, total) => val + total, 0) / this.results.length);
  }

  render() {
    if (this.state.finished) {
      return (
        <React.Fragment>
          {`avg: ${this.getAverage()}ms`}
          <button type="button" onClick={this.reset}>
            reset
          </button>
        </React.Fragment>
      );
    }

    if (!this.state.profiling) {
      return (
        <button type="button" onClick={this.start}>
          start
        </button>
      );
    }

    return (
      <div>
        {!this.state.start ? (
          <Baba name="profiler">
            <Noop>
              {baba => (
                <div {...baba}>
                  <span>{this.iteration}</span>
                </div>
              )}
            </Noop>
          </Baba>
        ) : (
          <div>
            <Baba name="profiler" onFinish={this.onNextIteration}>
              {baba => (
                <div {...baba}>
                  <span>{this.iteration}</span>
                </div>
              )}
            </Baba>
          </div>
        )}
      </div>
    );
  }
}

storiesOf('yubaba/Baba', module)
  .add('profiler (1)', () => <BabaProfiler iterations={1} />)
  .add('profiler (10)', () => <BabaProfiler iterations={10} />)
  .add('profiler (100)', () => <BabaProfiler iterations={100} />)
  .add('profiler (1000)', () => <BabaProfiler iterations={1000} />);
