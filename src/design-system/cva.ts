type VariantMap = Record<string, Record<string, string>>;

interface CVAConfig<V extends VariantMap> {
  variants?: V;
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>;
}

type PropsFromConfig<V extends VariantMap> = {
  [K in keyof V]?: keyof V[K];
} & Record<string, any>;

interface CVAFn<V extends VariantMap> {
  (props?: PropsFromConfig<V>): string;
}

export function cva<V extends VariantMap>(
  base: string,
  config?: CVAConfig<V>,
): CVAFn<V> {
  return (props?: PropsFromConfig<V>) => {
    const classes: string[] = [base];
    const variants = config?.variants ?? ({} as V);
    const defaults = (config?.defaultVariants ?? {}) as Partial<{
      [K in keyof V]: keyof V[K];
    }>;

    for (const variantName in variants) {
      const value =
        (props && (props as any)[variantName]) ?? defaults[variantName];
      if (value) {
        const possible = variants[variantName];
        const className = possible?.[value as string];

        if (className) {
          classes.push(className);
        }
      }
    }

    return classes.join(' ');
  };
}

// Extrai o tipo das variantes a partir da função retornada
export type VariantProps<T> = T extends (props?: infer P) => any ? P : never;
