// global.d.ts
declare module '*.json' {
    // Allow importing JSON files as any
    const value: any;
    export default value;
}
