import React from "react";

const Search = (props) => {
    return(
        <div className="col col-sm-2">
            <input 
             className="form"
             onChange={(event) => props.setSearchvalue(event.target.value)}
             value={props.value} 
             placeholder="Zoeken naar..."
             ></input>
        </div>
    )
}

export default Search;