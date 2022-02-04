import React from 'react';
import {Box, Heading, FlatList} from 'native-base';
import ListItem from './ListItem';

const Watchlist = ({seasons = [], markWatched, deleteSeason}) => {
  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Web Series
      </Heading>
      <FlatList
        data={seasons}
        renderItem={({item}) => (
          <ListItem
            item={item}
            markWatched={markWatched}
            deleteSeason={deleteSeason}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};

export default Watchlist;
