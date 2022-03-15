import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import FilePreviews from 'renderer/components/file_previews';
import SearchBar from 'renderer/components/search_bar';
import { FileMetadata } from 'renderer/types';
import styled from 'styled-components';
import NavigationButton from '../components/NavigationButton';
import useOrderedEssays from '../hooks/essays/useOrderedEssays';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
`;

const ContentContainer = styled.div`
  width: 500px;
  margin: 32px;
`;

const SearchContainer = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  width: 400px;
`;

const OrderDropdownContainer = styled.div`
  width: 150px;
  margin-right: 20px;
`;

const SearchResultsContainer = styled.div`
  margin-top: 32px;
`;

export default function Search() {
  const [fileMetadataList, setFileMetadataList] = useState<FileMetadata[]>([]);
  const [order, setOrder] = useState('');
  useOrderedEssays(order, setFileMetadataList, order === '');

  return (
    <Container>
      <BackButtonContainer>
        <NavigationButton path={-1} label="Back" />
      </BackButtonContainer>
      <ContentContainer>
        <SearchContainer>
          <SearchBarContainer>
            <SearchBar setFileMetadataList={setFileMetadataList} />
          </SearchBarContainer>
          <OrderDropdownContainer>
            <FormControl fullWidth>
              <InputLabel id="search-all">All By:</InputLabel>
              <Select
                labelId="search-all-select"
                value={order}
                autoWidth
                onChange={(e) => setOrder(e.target.value)}
              >
                <MenuItem value="asc">
                  Date <ArrowUpward />
                </MenuItem>
                <MenuItem value="desc">
                  Date <ArrowDownward />
                </MenuItem>
              </Select>
            </FormControl>
          </OrderDropdownContainer>
        </SearchContainer>
        <SearchResultsContainer>
          <FilePreviews fileMetadataList={fileMetadataList} />
        </SearchResultsContainer>
      </ContentContainer>
    </Container>
  );
}
