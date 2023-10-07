import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: [],
  mapPosition: [59, 5],
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false };

    default:
      break;
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, mapPosition }, dispatch] =
    useReducer(reducer, initialState);
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading the data...",
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const city = await res.json();
      dispatch({ type: "city/loaded", payload: city });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({
        type: "rejected",
        payload: "There was an error getting the city...",
      });
    }
  }
  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const city = await res.json();
      dispatch({ type: "cities/created", payload: city });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the data...",
      });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });

      await fetch(`http://localhost:8000/cities${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city...",
      });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        getCity,
        mapPosition,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("not the place");
  return context;
}

export { CitiesProvider, useCities };
