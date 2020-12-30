


const Search = ({value, onChange, children, onSubmit, classNameInput, classNameButton}) => 
  
      <form onSubmit= {onSubmit}>
         <input 
          type="text"
          value={value}
          onChange={onChange}
          className= {classNameInput}
        /> 
        <button type="submit" 
        className={classNameButton}>
        {children}
        </button>
      </form>


export default Search ;