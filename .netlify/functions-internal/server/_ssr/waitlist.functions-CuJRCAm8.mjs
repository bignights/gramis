import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-CEa0QXI2.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D6mg4qn-.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { s as stringType, o as objectType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqnverg";
const TIER_CAPS = {
  founder: 69,
  priority: 300,
  early_adopter: 1e3
};
const emailSchema = stringType().trim().toLowerCase().email().max(254);
const getWaitlistStats_createServerFn_handler = createServerRpc({
  id: "0cc774eece9ec5e8c6af1e78d9233ce3bf1ba34400a879701292c048df4e918b",
  name: "getWaitlistStats",
  filename: "src/lib/waitlist.functions.ts"
}, (opts) => getWaitlistStats.__executeServer(opts));
const getWaitlistStats = createServerFn({
  method: "GET"
}).handler(getWaitlistStats_createServerFn_handler, async () => {
  const {
    supabaseAdmin
  } = await import("./client.server-DYVThwkn.mjs");
  const client = supabaseAdmin;
  const counts = {
    founder: 0,
    priority: 0,
    early_adopter: 0
  };
  for (const tier of Object.keys(counts)) {
    const {
      count
    } = await client.from("waitlist_signups").select("*", {
      count: "exact",
      head: true
    }).eq("tier", tier);
    counts[tier] = count ?? 0;
  }
  return {
    founder: counts.founder,
    priority: counts.priority,
    earlyAdopter: counts.early_adopter,
    total: counts.founder + counts.priority + counts.early_adopter
  };
});
const joinWaitlist_createServerFn_handler = createServerRpc({
  id: "84d93890dd9c1e59a64f5ae8101da2c7f60e63742e9ff41c41f350a81144ccda",
  name: "joinWaitlist",
  filename: "src/lib/waitlist.functions.ts"
}, (opts) => joinWaitlist.__executeServer(opts));
const joinWaitlist = createServerFn({
  method: "POST"
}).validator(objectType({
  email: emailSchema,
  sourceButton: enumType(["hero", "founder", "priority", "early_adopter"])
})).handler(joinWaitlist_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DYVThwkn.mjs");
  const client = supabaseAdmin;
  const {
    data: existing
  } = await client.from("waitlist_signups").select("tier").eq("email", data.email).maybeSingle();
  if (existing) {
    return {
      status: "already_joined",
      tier: existing.tier
    };
  }
  const counts = {
    founder: 0,
    priority: 0,
    early_adopter: 0
  };
  for (const tier of Object.keys(counts)) {
    const {
      count
    } = await client.from("waitlist_signups").select("*", {
      count: "exact",
      head: true
    }).eq("tier", tier);
    counts[tier] = count ?? 0;
  }
  const preferred = data.sourceButton === "hero" ? null : data.sourceButton;
  const order = ["founder", "priority", "early_adopter"];
  let assigned = null;
  if (preferred && counts[preferred] < TIER_CAPS[preferred]) {
    assigned = preferred;
  } else {
    for (const t of order) {
      if (counts[t] < TIER_CAPS[t]) {
        assigned = t;
        break;
      }
    }
  }
  if (!assigned) return {
    status: "closed"
  };
  const {
    error
  } = await client.from("waitlist_signups").insert({
    email: data.email,
    tier: assigned,
    source_button: data.sourceButton
  });
  if (error) {
    if (error.code === "23505") {
      return {
        status: "already_joined",
        tier: assigned
      };
    }
    throw new Error(error.message);
  }
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: data.email,
        tier: assigned,
        source_button: data.sourceButton
      })
    });
  } catch {
  }
  return {
    status: "ok",
    tier: assigned
  };
});
const getAllSignups_createServerFn_handler = createServerRpc({
  id: "f978c420bb838533f8f04acf4d76a18e6c52c6bb174c9fa5c826a875e773f092",
  name: "getAllSignups",
  filename: "src/lib/waitlist.functions.ts"
}, (opts) => getAllSignups.__executeServer(opts));
const getAllSignups = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getAllSignups_createServerFn_handler, async ({
  context
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-DYVThwkn.mjs");
  const adminClient = supabaseAdmin;
  const {
    data: roleRow
  } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (!roleRow) throw new Error("Forbidden");
  const {
    data,
    error
  } = await adminClient.from("waitlist_signups").select("id, email, tier, source_button, created_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
export {
  getAllSignups_createServerFn_handler,
  getWaitlistStats_createServerFn_handler,
  joinWaitlist_createServerFn_handler
};
