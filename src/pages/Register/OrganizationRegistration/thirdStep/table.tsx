// CourseTable.tsx
import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { CourseTableProps } from './interface';

const CourseTable: React.FC<CourseTableProps> = ({ courses, onDelete }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Grade</Th>
          <Th>Course Name</Th>
          <Th>Duration (hr)</Th>
          <Th>Price</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {courses.map((course, index) => (
          <Tr key={index}>
            <Td>{course.grade}</Td>
            <Td>{course.name}</Td>
            <Td>{course.duration}</Td>
            <Td>{course.price}</Td>
            <Td>
              {/* <IconButton
                icon={<EditIcon />}
                aria-label="Edit"
                variant="outline"
                onClick={() => onEdit(index)}
                mr="4"
              /> */}
              <IconButton
                icon={<DeleteIcon />}
                variant={'danger'}
                aria-label="Delete"
                onClick={() => onDelete(index)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CourseTable;
