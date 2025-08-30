type sizeProps = '1' | '2' | '3' | '4';

type loaderMapProps = {
  [k in sizeProps]: {
    border: string;
    inset: string;
    radius: string;
  };
};

const loaderMap: loaderMapProps = {
  '1': {
    border: 'border-[2px]',
    inset: 'inset-[4px]',
    radius: 'h-6 w-6',
  },

  '2': {
    border: 'border-[3px]',
    inset: 'inset-[3.5px]',
    radius: 'h-7 w-7',
  },

  '3': {
    border: 'border-[4px]',
    inset: 'inset-[3px]',
    radius: 'h-8 w-8',
  },

  '4': {
    border: 'border-[5px]',
    inset: 'inset-[2.5px]',
    radius: 'h-9 w-9',
  },
};

export function Loader({ size }: { size: sizeProps }) {
  return (
    <div className={`relative ${loaderMap[size].radius}`}>
      <div className="absolute inset-0 animate-ping rounded-full bg-brand-600/40" />
      <div
        className={`absolute ${loaderMap[size].inset} rounded-full ${loaderMap[size].border} border-brand-600 border-t-transparent animate-spin`}
      />
    </div>
  );
}
