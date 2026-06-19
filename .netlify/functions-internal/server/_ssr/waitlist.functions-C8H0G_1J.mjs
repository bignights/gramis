import { r as reactExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DR3079Rj.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CEesffxM.mjs";
import { o as objectType, e as enumType, s as stringType } from "../_libs/zod.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const TIER_CAPS = {
  founder: 69,
  priority: 300,
  early_adopter: 1e3
};
const emailSchema = stringType().trim().toLowerCase().email().max(254);
const getWaitlistStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("0cc774eece9ec5e8c6af1e78d9233ce3bf1ba34400a879701292c048df4e918b"));
const joinWaitlist = createServerFn({
  method: "POST"
}).validator(objectType({
  email: emailSchema,
  sourceButton: enumType(["hero", "founder", "priority", "early_adopter"])
})).handler(createSsrRpc("84d93890dd9c1e59a64f5ae8101da2c7f60e63742e9ff41c41f350a81144ccda"));
const getAllSignups = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("f978c420bb838533f8f04acf4d76a18e6c52c6bb174c9fa5c826a875e773f092"));
export {
  TIER_CAPS as T,
  getAllSignups as a,
  getWaitlistStats as g,
  joinWaitlist as j,
  useServerFn as u
};
