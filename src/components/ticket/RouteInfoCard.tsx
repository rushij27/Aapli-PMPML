import { Autocomplete, Box, styled, TextField } from "@mui/material";
import { BusFront, Edit2 } from "lucide-react";
import { routes, busStops } from "../../data/routes.json";
import { formInputs } from "../../data/forms/forms.json";
import { useEffect, useState } from "react";
import { useGeneralContext } from "../../generalContextApi";

export const RouteInfoCard = ({ route, start, end }: any) => {
    return (
        <div className="p-1 space-y-1">
            <div className="flex flex-row items-center">
                <BusFront className="bg-gray-400 rounded-md p-1 mr-4 ml-0" color="#ffffff" />
                <span className="font-bold">{route}</span>
            </div>
            <div>
                <div className="text-sm">O {start}</div>
                <div>|</div>
                <div className="text-sm">O  {end}</div>
            </div>
        </div>
    )
}


export function SelectRoute() {
    const context: any = useGeneralContext();
    const [selectedRoute, setSelectedRoute] = useState('');
    const [destinationPoints, setDesitnationPoints] = useState({
        start: "",
        end: ""
    });

    const findStartandEnd = (selectedRoute: string) => {
        const route = routes.find((route) => route.routeNumber === selectedRoute);
        if (route) {
            setDesitnationPoints({ start: route.start, end: route.end });
            context.setState((prev: any) => ({ ...prev, route: route }));
        }
    }

    return (
        <>
            {selectedRoute ? 
            <div className="flex flex-row items-center justify-between w-full">
                <div>Bus Number: <span className="font-bold">{selectedRoute}</span>
                    <div>towards {destinationPoints.end}</div>
                </div>
                <div onClick={() => setSelectedRoute('')}><Edit2 className="w-4 h-4 cursor-pointer" /></div>
            </div> 
            
            : <CustomAutoComplete
                id="routes-select-demo"
                sx={{ width: 300 }}
                onInputChange={(_, newInputValue) => {
                    setSelectedRoute(newInputValue);
                    findStartandEnd(newInputValue);
                }}
                options={routes}
                autoHighlight
                getOptionLabel={(option: any) => option.routeNumber}
                renderOption={(props, option: any) => {
                    const { key, ...optionProps } = props;
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                        >
                            <RouteInfoCard route={option.routeNumber} start={option.start} end={option.end} />
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <CustomTextField
                        {...params}
                        label={formInputs.routePlaceholder}
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                autoComplete: 'new-password',
                            },
                        }}
                    />
                )}
            />}
        </>
    );
}

interface BusStop {
    label: string;
    fair: string;
    stop: string;
}

export function SelectStops() {
    const context: any = useGeneralContext();
    const [allRoutes, setAllRoutes] = useState<BusStop[]>([]);
    const [selectedStops, setSelectedStops] = useState({
        start: "",
        end: ""
    });

    useEffect(() => {
        if (context.state.route?.routeNumber) {
            mapAllBusStops();
        }
    }, [context.state.route]);

    const mapAllBusStops = () => {
        try {
            const direction = context.state.route.isGoingUp ? 'up' : 'down';
            const busNumber = context.state.route.routeNumber;
            const busStopsData: any = busStops[0];
            const busStopsForRoute = busStopsData[direction][busNumber];
            const allFairs = busStopsForRoute.map((ele: any) => ele.fair);
            
            if (!busStopsForRoute) {
                console.error(`No stops found for bus number ${busNumber} in ${direction} direction`);
                setAllRoutes([]);
                return;
            }
            
            setAllRoutes(busStopsForRoute);

            context.setState((prev: any) => ({
                ...prev,
                selectedStops: {
                    ...prev.selectedStops,
                    allFairs: allFairs
                }
            }));

        } catch (error) {
            console.error('Error mapping bus stops:', error);
            setAllRoutes([]);
        }
    };

    const handleStopSelection = (newValue: any, type: 'start' | 'end') => {
        if (newValue) {
            setSelectedStops(prev => ({
                ...prev,
                [type]: newValue
            }));
            
            context.setState((prev: any) => ({
                ...prev,
                selectedStops: {
                    ...prev.selectedStops,
                    [type]: newValue
                }
            }));
        } else {
            setSelectedStops(prev => ({
                ...prev,
                [type]: ''
            }));
            
            context.setState((prev: any) => ({
                ...prev,
                selectedStops: {
                    ...prev.selectedStops,
                    [type]: ''
                }
            }));
        }
        console.log(context.state);
    };

    return (
        <div className="space-y-4">
            {/* Starting Stop Selection */}
            <div className="space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <div>Starting stop: <span className="font-bold">{selectedStops.start}</span></div>
                    <Edit2 className="w-4 h-4 cursor-pointer" />
                </div>
                
                {context.state.route.routeNumber && (
                    <CustomAutoComplete
                        id="start-stop-select"
                        sx={{ width: "100%" }}
                        value={selectedStops.start}
                        onChange={(_, newValue) => handleStopSelection(newValue, 'start')}
                        options={allRoutes.map(route => route.label)}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                variant="outlined"
                            />
                        )}
                    />
                )}
            </div>

            {/* Ending Stop Selection */}
            <div className="space-y-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <div>Ending stop: <span className="font-bold">{selectedStops.end}</span></div>
                    <Edit2 className="w-4 h-4 cursor-pointer" />
                </div>
                
                {selectedStops.start && (
                    <CustomAutoComplete
                        id="end-stop-select"
                        sx={{ width: "100%" }}
                        value={selectedStops.end}
                        onChange={(_, newValue) => handleStopSelection(newValue, 'end')}
                        options={allRoutes.map(route => route.label)}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                                variant="outlined"
                            />
                        )}
                    />
                )}
            </div>
        </div>
    );
}

const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
      fontFamily: 'Maven Pro, sans-serif',
      color: '#374151',
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Maven Pro, sans-serif',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E5E7EB',
      },
      '&:hover fieldset': {
        borderColor: '#9CA3AF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#059669',
      },
    },
});

const CustomAutoComplete = styled(Autocomplete)({
    '& .MuiInputLabel-root': {
      fontFamily: 'Maven Pro, sans-serif',
      color: '#374151',
    },
    '& .MuiInputBase-input': {
      fontFamily: 'Maven Pro, sans-serif',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#E5E7EB',
      },
      '&:hover fieldset': {
        borderColor: '#9CA3AF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#059669',
      },
    },
});