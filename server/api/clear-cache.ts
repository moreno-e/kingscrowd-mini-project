export default defineEventHandler(async (event) => {
  const storage = useStorage('cache');
  await storage.clear();
  return { success: true, message: 'Cache cleared' };
});
