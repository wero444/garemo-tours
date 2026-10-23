// With cacheComponents, `export const dynamic` is not allowed, but a static export only prerenders route
// handlers that are marked static. Exporting generateStaticParams is the remaining way to mark them.
export const generateStaticParams = async () => [{}]
