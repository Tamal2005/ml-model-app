import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("about","components/About.tsx"),
    route("overview","components/Overview.tsx"),    
    route("spam-mail","components/modelsPage/SpamMailPage.tsx"),
    route("phishing-url","components/modelsPage/PhishingUrlPage.tsx"),
    route("face-mask","components/modelsPage/FaceMaskPage.tsx"),
    route("deepfake-voice","components/modelsPage/DeepfakeVoicePage.tsx"),
] satisfies RouteConfig;
