import styled from "styled-components";
import Link from 'next/link'
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  ul {
    list-style: none;
    display: flex;
    li {
      a {
        text-decoration: none;
        font-weight: bold;
        color: ${({theme}) => theme.colors.text};
        padding-right: 20px;
        &:hover {
          color: ${({theme}) => theme.colors.primary}
        }
      }
    }
  }
`
interface PaginationProps {
  totalPages: number;
  totalCount: number;
}

const Pagination: React.FC<PaginationProps> = ({totalPages, totalCount}) => {
  const [arrayPages, setArrayPages] = useState<number[]>([])
  const { query } = useRouter();
  useEffect(() => {
    const link = Array(totalPages).fill('');
    setArrayPages(link.map((link, index) => index + 1))
  },[totalPages])
  
  return (
    <Container>
      <ul>
      {arrayPages.map(page => (
        <li key={page}>
          <Link href={{
            pathname: "/",
            query: {...query, page}
          }}
          shallow
          >
            <a>{page}</a>
          </Link>
        </li>
      ))}
      </ul>
      (total: {totalCount})
    </Container>
  )
}

export default Pagination;