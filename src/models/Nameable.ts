export function defaultName(names: any): string {
    return names.find((name: any) => name.isDefault).name;
}
