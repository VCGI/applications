
import React, { useState, useEffect, ChangeEvent } from 'react';
import { ArcGISFeature, ArcGISResponse } from './types';
import FilterableSelect from './FilterableSelect'; // Import the new component

const API_URL = 'https://services1.arcgis.com/BkFxaEFNwHqX3tAw/arcgis/rest/services/Vermont_Lotting_Plans_Towns_Table/FeatureServer/0/query?where=1%3D1&outFields=CurrentName,URL,FormerName,OriginYear&f=json';

interface DropdownOption {
  displayLabel: string;
  actualValue: string; 
  sortKey: string;
}

const App: React.FC = () => {
  const [allPlansData, setAllPlansData] = useState<ArcGISFeature[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);
  const [selectedCurrentName, setSelectedCurrentName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: ArcGISResponse = await response.json();

        if (data.error) {
          throw new Error(`API Error: ${data.error.message} (Code: ${data.error.code})`);
        }
        
        if (!data.features) {
          throw new Error('No features found in API response.');
        }

        const validFeatures = data.features.filter(
          (feature) => feature.attributes.CurrentName && feature.attributes.CurrentName.trim() !== ''
        );
        
        const sortedAllFeatures = validFeatures.sort((a, b) => {
          const nameCompare = a.attributes.CurrentName.localeCompare(b.attributes.CurrentName);
          if (nameCompare !== 0) return nameCompare;
          return (a.attributes.OBJECTID || 0) - (b.attributes.OBJECTID || 0);
        });
        
        setAllPlansData(sortedAllFeatures);

        const newDropdownOptionsMap = new Map<string, DropdownOption>();

        sortedAllFeatures.forEach(feature => {
          const currentName = feature.attributes.CurrentName.trim();
          if (!newDropdownOptionsMap.has(currentName)) { // Use currentName as key for the map to avoid duplicates based on displayLabel trickery later
            newDropdownOptionsMap.set(currentName, { // Keyed by actualValue (CurrentName)
              displayLabel: currentName,
              actualValue: currentName,
              sortKey: currentName
            });
          }
        });
        
        // Create a temporary array to hold all potential display options including former names
        let tempOptions: DropdownOption[] = [];
        
        newDropdownOptionsMap.forEach(option => {
            tempOptions.push(option); // Add the CurrentName as a primary option
        });

        sortedAllFeatures.forEach(feature => {
          const currentName = feature.attributes.CurrentName.trim();
          const formerName = feature.attributes.FormerName?.trim();

          if (formerName && formerName !== '') {
            const displayLabel = `${formerName} (Current Name: ${currentName})`;
            // Check if an option with this specific displayLabel already exists to avoid true duplicates
            // This is simpler than trying to manage map keys with displayLabel vs actualValue
            if (!tempOptions.some(opt => opt.displayLabel === displayLabel)) {
                 tempOptions.push({
                    displayLabel: displayLabel,
                    actualValue: currentName, // actualValue is still the CurrentName
                    sortKey: formerName // sortKey is the FormerName for these entries
                });
            }
          }
        });
        
        // Sort all collected options by their sortKey
        const finalOptions = tempOptions.sort((a, b) => a.sortKey.localeCompare(b.sortKey));
        
        setDropdownOptions(finalOptions);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while fetching data.');
        }
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  const handleSelectChange = (selectedValue: string) => { // Updated for FilterableSelect
    setSelectedCurrentName(selectedValue); 
  };

  const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-lg text-slate-700">Loading Town Data...</p>
    </div>
  );

  const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 shadow-md" role="alert">
      <p className="font-bold text-xl mb-2">Oops! Something went wrong.</p>
      <p className="text-md">{message}</p>
      <p className="text-sm mt-2">Please try refreshing the page or check the console for more details.</p>
    </div>
  );

  const associatedPlansForSelectedCurrentName = selectedCurrentName
    ? allPlansData.filter(plan => plan.attributes.CurrentName === selectedCurrentName)
    : [];

  const displayedFormerNames = selectedCurrentName 
    ? Array.from(new Set(
        associatedPlansForSelectedCurrentName
          .map(plan => plan.attributes.FormerName?.trim())
          .filter((name): name is string => !!name && name !== '')
      ))
    : [];

  const plansWithUrls = associatedPlansForSelectedCurrentName.filter(
    plan => plan.attributes.URL && plan.attributes.URL.trim() !== ''
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8f8f8]">
      <main className="bg-white p-6 sm:p-8 md:p-10 shadow-2xl w-full max-w-2xl transform transition-all duration-500 hover:shadow-3xl">
        
        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorDisplay message={error} />}
        
        {!isLoading && !error && (
          <>
            <div className="mb-6">
              <label htmlFor="town-select-input" className="block text-sm font-medium text-slate-700 mb-1"> {/* Updated htmlFor for accessibility */}
                Select a Town:
              </label>
              <FilterableSelect
                options={dropdownOptions}
                value={selectedCurrentName}
                onChange={handleSelectChange}
                placeholder="-- Type or select a town --"
                ariaLabel="Select a Vermont town by current or former name to view its lotting plan URL"
              />
            </div>

            {selectedCurrentName && associatedPlansForSelectedCurrentName.length > 0 && (
              <div className="mt-8 p-6 bg-white border border-slate-300 shadow-md transition-all duration-300 ease-in-out" role="region" aria-live="polite">
                <h2 className="text-xl font-semibold text-slate-800 mb-3">
                  Lotting Plan Information for: <span className="text-green-700">{selectedCurrentName}</span> 
                </h2>
                
                {displayedFormerNames.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm text-slate-600 mb-1">Former Name(s):</p>
                    <p className="text-base text-green-700">{displayedFormerNames.join(', ')}</p>
                  </div>
                )}

                <div className="mt-4">
                  <p className="text-sm text-slate-600 mb-1">Available Plan Links:</p>
                  {plansWithUrls.length > 0 ? (
                    <div>
                      {plansWithUrls.map((plan) => {
                        let finalDisplayYear = "No Date";
                        const originYearValue = plan.attributes.OriginYear; 

                        if (originYearValue && typeof originYearValue === 'string') {
                            const trimmedOriginYear = originYearValue.trim();
                            if (/^\d{4}$/.test(trimmedOriginYear)) { 
                                finalDisplayYear = trimmedOriginYear;
                            }
                        }
                        
                        return (
                          <div key={plan.attributes.URL} className="mb-2">
                            <a
                              href={plan.attributes.URL!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition duration-150 ease-in-out text-base"
                              title={`Open plan link for ${selectedCurrentName} (Year: ${finalDisplayYear}, URL: ${plan.attributes.URL})`}
                            >
                              {finalDisplayYear}
                            </a>
                           </div>
                        );
                      })}
                       <p className="text-xs text-slate-500 mt-2 italic">
                        (Note: Links will open in a new tab. Availability of the linked content is not guaranteed.)
                      </p>
                    </div>
                  ) : (
                    <p className="text-slate-700 text-base">
                      No plan links available for {selectedCurrentName}.
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      {/* Footer removed */}
    </div>
  );
};

export default App;
