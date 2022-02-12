import {Box} from 'native-base';
import React from 'react';

function TaskCompleted() {
  return (
    <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
      Congratulations! Task Completed ✅
    </Box>
  );
}

function TaskExpired() {
  return (
    <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
      Task expired can't modify now 😒
    </Box>
  );
}

function TaskCompletedAndExpired() {
  return (
    <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
      Task completed and expired! can't modify now 😒
    </Box>
  );
}

function TaskDeleted() {
  return (
    <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
      Task Deleted ❌
    </Box>
  );
}

export {TaskCompleted, TaskExpired, TaskDeleted, TaskCompletedAndExpired};
