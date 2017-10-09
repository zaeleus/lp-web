declare namespace NodeJS {
    interface Global {
        requestAnimationFrame(callback: (...args: any[]) => void): number;
    }
}
