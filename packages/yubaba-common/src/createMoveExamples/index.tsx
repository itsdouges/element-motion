import * as React from 'react';
import * as Common from '../index';
import * as Styled from './styled';

const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

export const createMoveExamples = (options: { useDistinctEnd: boolean; namePrefix: string }) => (
  Animator: React.ComponentType<{ name: string; in?: boolean }>,
  Animation: React.ComponentType<{ [key: string]: any; children: (opts: any) => React.ReactNode }>
) => ({
  Default: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.RelativeListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.AbsoluteListItem
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.RelativeListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.FixedListItem
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    margin={100}
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    size={2}
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem margin={20} ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
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
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    width={2}
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    borderRadius="50%"
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
              <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                  )}
                </Animation>
              </Animator>
            </div>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <div>
              <Styled.Padding />
              <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItemFloatingRight
                      ref={ref}
                      onClick={() => toggle()}
                      alternate={options.useDistinctEnd}
                      {...props}
                    />
                  )}
                </Animation>
              </Animator>
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
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          ) : (
            <Styled.ContainerFloatingRight>
              <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItemFillSpace
                      ref={ref}
                      onClick={() => toggle()}
                      alternate={options.useDistinctEnd}
                      {...props}
                    />
                  )}
                </Animation>
              </Animator>
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
              <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                  )}
                </Animation>
              </Animator>
            </Styled.LongContainer>
          ) : (
            <Animator name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  FromAlwaysMounted: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Animator name={`${options.namePrefix}-default`} in={!shown}>
            <Animation>
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
            </Animation>
          </Animator>

          {shown && (
            <Animator name={`${options.namePrefix}-default`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    ref={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Animator>
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
            <Animator name={`${options.namePrefix}-default`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem ref={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Animator>
          )}

          <Animator name={`${options.namePrefix}-default`} in={!!shown}>
            <Animation>
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
            </Animation>
          </Animator>
        </div>
      )}
    </Common.Toggler>
  ),
});
