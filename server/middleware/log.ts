export default defineEventHandler(async (event) => {
  console.log(`[${event.node.req.method}] ${getRequestURL(event)}`);
});
