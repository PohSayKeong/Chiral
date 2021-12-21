const isProduction = process.env.NODE_ENV === "production";
// log the pageview with their URL
export const pageview = (url) => {
    if (isProduction) {
        window.gtag("config", "G-SGY008JHGX", {
            page_path: url,
        });
    }
};

// log specific events happening.
export const event = ({ action, params }) => {
    if (isProduction) {
        window.gtag("event", action, params);
    }
};
