import {useState, useCallback} from 'react'
import { FiSearch } from 'react-icons/fi'
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 0.5rem;
    margin-right: 10px;
    border: 2px solid transparent;
    transition: border 0.3s ;
    &:focus {
      border: 2px solid ${({theme}) => theme.colors.primary}
    }
  }
  button {
    height: 50px;
    width: 100px;
    border: none;
    background: ${({theme}) => theme.colors.primary};
    border-radius: 0.5rem;
    transition: background 0.3s;
    &:hover {
      background: #1DAB77;
    }
    svg {
      color: #FFF;
    }
  }
`

interface SearchProps {
  placeholder: string;
  handleSearch: (term: string) => void;
}


const Search: React.FC<SearchProps> = ({placeholder, handleSearch}) => {
  const [search, setSearch] = useState<string>()
  const handleSubmit = useCallback(() => {
    handleSearch(search)
    setSearch('')
  }, [search])
  return (
    <Container>
      <input 
        type="text" 
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
      /> 
      <button onClick={handleSubmit}>
        <FiSearch size={20} />
      </button>
    </Container>
  )
}

export default Search;