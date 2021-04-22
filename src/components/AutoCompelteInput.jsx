import React, { useEffect, useState, useRef } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import weatherRequests from "../api/weatherRequests";
import { RiSearch2Line, } from 'react-icons/ri';
import { IconContext } from "react-icons";
import LikeButton from "./LikeButton";
const AutoCompelteInput = ({ search, setSearch, onClick, canLike, locationKey }) => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null)
  const wrapperRef = useRef(null);


  useEffect(() => {
    let id = setTimeout(() => {
      (async () => {
        try {
          if (!search || options.length)
            return;
          const { data, status } = await weatherRequests.getAutoCompleteSearches(search);
          if (status === 'success') {
            setOptions(data);
            setDisplay(true)
          } else
            setError('didnt found places')
        } catch (error) {
          setError(error.message + ' The allowed number of requests has been exceeded.')
        }
      })()
    }, 500);

    return () => {
      clearTimeout(id)
    }

  }, [search, options]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };


  const handleClick = (location) => {
    onClick(location)
    setSearch(location.LocalizedName);
    setDisplay(false);
  }

  const handleChangeText = (text) => {
    setSearch(text);
    setError('')
    setOptions([]);
  }

  const renderOptions = () => {

    if (display && options.length > 0)
      return (
        <div className="optionsautoContainer">
          {options
            .map((value, i) => {
              return (
                <div
                  onClick={() => handleClick(value)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span className="optionsText"> Country: {value.Country.LocalizedName} , City: {value.LocalizedName}</span>
                </div>
              );
            })}
        </div>
      )
  }
  return (
    <IconContext.Provider value={{ size: '1em' }}>
      <div ref={wrapperRef} className=" optionsContainer">
        <div className="optionsCenter">
          <InputGroup size='lg' className="mb-3">
            <InputGroup.Prepend>
              <Button disabled variant=" ">
                <RiSearch2Line />
              </Button>
            </InputGroup.Prepend>
            <FormControl
              className="inputSearch"
              onClick={() => setDisplay(!display)}
              placeholder="Type to search"
              value={search}
              onChange={event => handleChangeText(event.target.value)} aria-describedby="basic-addon1" />

            <InputGroup.Append>
              <LikeButton locationKey={locationKey} canLike={canLike} />
            </InputGroup.Append>
          </InputGroup>


          {error ?
            <span>{error}</span> :

            renderOptions()}

        </div>
      </div>
    </IconContext.Provider>

  );
};



export default AutoCompelteInput;