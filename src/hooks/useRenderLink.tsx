import React, { useMemo } from 'react';

// routing
import { Link as RouterLink } from 'react-router-dom';

// returns a memoized react-router-dom Link component, which can be used with MUI's Link components
export const useRenderLink = (to: string) => {
  return useMemo(
    () =>
      React.forwardRef(
        (itemProps: any, ref: React.ForwardedRef<HTMLAnchorElement>) => (
          <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
        )
      ),
    [to]
  );
};
