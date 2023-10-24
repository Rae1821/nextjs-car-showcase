'use client'

import { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Image from 'next/image';

import { SearchManufacturerProps } from '@types';
import { manufacturers } from '@/constants';


const SearchManufacturer = ( { manufacturer, setManufacturer }: SearchManufacturerProps) => {

    const [query, setQuery] = useState('');

    const filteredManufacturers = query === ''
        ? manufacturers
        : manufacturers.filter((item) =>
            item.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
    );


    return (
        <div className="search-manufacturer">
            <Combobox value={manufacturer} onChange={setManufacturer}>
                <div className="realtive w-full">
                    {/* Button for the combobox. Click on the icon to see the complete dropdown list. */}
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src="/car-logo.svg"
                            alt="car logo"
                            width={20}
                            height={20}
                            className="ml-4"
                        />
                    </Combobox.Button>

                    {/* Input field for searching */}
                    <Combobox.Input
                        className="search-manufacturer__input"
                        placeholder="Volkswagon"
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => setQuery(e.target.value)} //Update the searrch query when the input changes
                    />
                    {/* Transition for displaying the options */}
                    <Transition
                        as={Fragment} //Group multiple elements without introducing an additional DOM node i.e. <></>
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')} //Reset the search query after the transition completes
                    >
                        <Combobox.Options>
                            {filteredManufacturers.map((item) => (
                                <Combobox.Option
                                    key={item}
                                    value={item}
                                    className={({ active }) => `relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {item}
                                            </span>
                                            {/* Show an active blue background color if the option is selected */}
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>

                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                            }
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
    </div>
  )
}

export default SearchManufacturer
