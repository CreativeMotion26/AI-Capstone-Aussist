export default {
    expo: {
      name: "Aussist",
      slug: "aussist",
      sdkVersion: "53.0.0",
      extra: {
        API_BASE: process.env.API_BASE || "http://192.168.1.117:8001",
        
      },
      ios: {
        bundleIdentifier: "com.anonymous.aussist",
      },
    },
  };
  