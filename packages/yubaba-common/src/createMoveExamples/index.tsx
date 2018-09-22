import * as React from 'react';
import * as Common from '../index';
import * as Styled from './styled';

const RestoreScrollOnMount = Common.createRestoreScrollOnMount();

export const createMoveExamples = (options: { useDistinctEnd: boolean; namePrefix: string }) => (
  Baba: React.ComponentType<{ name: string; in?: boolean }>,
  Animation: React.ComponentType<{ [key: string]: any; children: (opts: any) => React.ReactNode }>
) => ({
  Default: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  WithMargin: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          {!shown ? (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    margin={100}
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    size={2}
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem margin={20} innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    size={2}
                    innerRef={ref}
                    margin={50}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    width={2}
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    borderRadius="50%"
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
              <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                  )}
                </Animation>
              </Baba>
            </div>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <div>
              <Styled.Padding />
              <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItemFloatingRight
                      innerRef={ref}
                      onClick={() => toggle()}
                      alternate={options.useDistinctEnd}
                      {...props}
                    />
                  )}
                </Animation>
              </Baba>
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
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          ) : (
            <Styled.ContainerFloatingRight>
              <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItemFillSpace
                      innerRef={ref}
                      onClick={() => toggle()}
                      alternate={options.useDistinctEnd}
                      {...props}
                    />
                  )}
                </Animation>
              </Baba>
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
              <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-1`}>
                <Animation>
                  {({ ref, ...props }) => (
                    <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                  )}
                </Animation>
              </Baba>
            </Styled.LongContainer>
          ) : (
            <Baba name={`${options.namePrefix}-anim`} key={`${options.namePrefix}-2`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
          )}
        </div>
      )}
    </Common.Toggler>
  ),

  FromAlwaysMounted: () => (
    <Common.Toggler>
      {({ shown, toggle }) => (
        <div>
          <Baba name={`${options.namePrefix}-default`} in={!shown}>
            <Animation>
              {({ ref, style, ...props }) => (
                <Styled.ListItem
                  innerRef={ref}
                  onClick={() => toggle()}
                  // !! CURRENT LIMITATION ALERT !!
                  // Consumers need to set their own opacity depending if it's shown or not.
                  style={{ ...style, opacity: shown ? 0 : style.opacity }}
                  {...props}
                />
              )}
            </Animation>
          </Baba>

          {shown && (
            <Baba name={`${options.namePrefix}-default`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItemFloatingRight
                    innerRef={ref}
                    onClick={() => toggle()}
                    alternate={options.useDistinctEnd}
                    {...props}
                  />
                )}
              </Animation>
            </Baba>
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
            <Baba name={`${options.namePrefix}-default`}>
              <Animation>
                {({ ref, ...props }) => (
                  <Styled.ListItem innerRef={ref} onClick={() => toggle()} {...props} />
                )}
              </Animation>
            </Baba>
          )}

          <Baba name={`${options.namePrefix}-default`} in={!!shown}>
            <Animation>
              {({ ref, style, ...props }) => (
                <Styled.ListItemFloatingRight
                  innerRef={ref}
                  onClick={() => toggle()}
                  alternate={options.useDistinctEnd}
                  // !! CURRENT LIMITATION ALERT !!
                  // Consumers need to set their own opacity depending if it's shown or not.
                  style={{ ...style, opacity: !shown ? 0 : style.opacity }}
                  {...props}
                />
              )}
            </Animation>
          </Baba>
        </div>
      )}
    </Common.Toggler>
  ),
});
