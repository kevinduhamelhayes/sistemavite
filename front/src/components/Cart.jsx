import { TrashIcon } from '@heroicons/react/24/outline';

export default function Cart({ items, onUpdateQuantity, onRemove }) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    ${item.price.toFixed(2)} c/u
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          onUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="mx-2 w-16 rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-500"
                        onClick={() => onRemove(item.id)}
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
} 