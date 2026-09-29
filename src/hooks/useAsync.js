import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs an async function on mount (and whenever `deps` change) and hands
 * back { data, loading, error, reload }. Guards against setting state
 * after the component has gone.
 */
export default function useAsync(fn, deps = [], initial = null) {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const alive = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(() => {
    setLoading(true);
    return Promise.resolve()
      .then(fn)
      .then((res) => { if (alive.current) { setData(res); setError(null); } })
      .catch((err) => { if (alive.current) setError(err); })
      .finally(() => { if (alive.current) setLoading(false); });
  }, deps);

  useEffect(() => {
    alive.current = true;
    run();
    return () => { alive.current = false; };
  }, [run]);

  return { data, loading, error, reload: run };
}
