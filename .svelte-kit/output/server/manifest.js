export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.b9c1dd45.js","app":"_app/immutable/entry/app.30da8a99.js","imports":["_app/immutable/entry/start.b9c1dd45.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/singletons.4a9ba403.js","_app/immutable/chunks/index.9991ffd9.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/entry/app.30da8a99.js","_app/immutable/chunks/scheduler.3b48bc77.js","_app/immutable/chunks/index.e543c91d.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
