/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon as PlusIconSolid, TrashIcon } from '@heroicons/react/solid';

type IconButtonType = 'plus' | 'trash';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconButtonType;
};

export default function IconButton({ icon, ...rest }: IconButtonProps): JSX.Element {
  const iconButtonMap: Record<IconButtonType, JSX.Element> = {
    plus: <PlusIconSolid className="h-5 w-5" aria-hidden="true" />,
    trash: <TrashIcon className="h-5 w-5" aria-hidden="true" />,
  };

  return (
    <button
      {...rest}
      type="button"
      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {iconButtonMap[icon]}
    </button>
  );
}
