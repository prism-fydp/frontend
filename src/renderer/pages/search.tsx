import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import FilePreviews from 'renderer/components/file_previews';
import FileSummary from 'renderer/components/file_summary';
import SearchBar from 'renderer/components/search_bar';
import styled from 'styled-components';
import NavigationButton from '../components/NavigationButton';
import queryOrderedEssays from '../hooks/essays/useOrderedEssays';

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
  const [fileSummaries, setFileSummaries] = useState<FileSummary[]>([]);
  const [ordering, setOrdering] = useState('');

  const handleSelection = (event: SelectChangeEvent) => {
    const selection = event.target.value as string;
    setOrdering(selection);
    if (selection !== '') {
      queryOrderedEssays(ordering, setFileSummaries);
    }
  };

  return (
    <Container>
      <BackButtonContainer>
        <NavigationButton path={-1} label="Back" />
      </BackButtonContainer>
      <ContentContainer>
        <SearchContainer>
          <SearchBarContainer>
            <SearchBar setFileSummaries={setFileSummaries} />
          </SearchBarContainer>
          <OrderDropdownContainer>
            <FormControl fullWidth>
              <InputLabel id="search-all">All By:</InputLabel>
              <Select
                labelId="search-all-select"
                value={ordering}
                autoWidth
                onChange={handleSelection}
              >
                <MenuItem value="created_at: asc">
                  Date <ArrowUpward />
                </MenuItem>
                <MenuItem value="created_at: desc">
                  Date <ArrowDownward />
                </MenuItem>
              </Select>
            </FormControl>
          </OrderDropdownContainer>
        </SearchContainer>
        <SearchResultsContainer>
          <FilePreviews fileSummaries={fileSummaries} />
        </SearchResultsContainer>
      </ContentContainer>
    </Container>
  );
}
