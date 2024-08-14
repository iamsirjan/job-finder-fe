import {
  Flex,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
} from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import FrameWorkDropdown from 'components/select';
import { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetAllGradeList } from 'service/master/service-grade';
import { useGetAllSubjectList } from 'service/master/service-subject';
import { useJobFilter } from './state';

interface IFilter {
  grade: string[];
  subject: string[];
}

const FilterJob = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const grade = useGetAllGradeList();
  const subject = useGetAllSubjectList();

  const filterFormMethods = useForm<IFilter>();
  const {
    watch: watchFilter,
    setValue: setValueFilter,
    trigger: triggerFilter,
    formState: { errors: errorsFilter },
  } = filterFormMethods;

  const allGrade = useMemo(() => {
    return grade.data?.map((grade) => ({
      value: grade.id,
      label: grade.name,
    }));
  }, [grade]);

  const allSubject = useMemo(() => {
    return subject.data?.map((subject) => ({
      value: subject.id,
      label: subject.name,
    }));
  }, [subject]);

  const { setJobFilter, removeJobFilter, clearJobFilter } = useJobFilter();

  const gradeSel = watchFilter('grade');
  const subjectSel = watchFilter('subject');

  const selectedGrades = useMemo(() => {
    return grade.data
      ?.filter((grade) => gradeSel?.includes(grade.id))
      .map((grade) => ({ label: grade.name, value: grade.id }));
  }, [gradeSel, grade]);

  console.log(selectedGrades);

  const selectedSubjects = useMemo(() => {
    return subject.data
      ?.filter((subject) => subjectSel?.includes(subject.id))
      .map((subject) => ({ label: subject.name, value: subject.id }));
  }, [subjectSel, subject]);

  const handleSaveFilter = () => {
    const currentGradeFilters = gradeSel;
    const currentSubjectFilters = subjectSel;

    // Remove filters that are no longer selected
    useJobFilter.getState().jobFilter.forEach((filter) => {
      if (!currentGradeFilters.includes(filter.value)) {
        removeJobFilter(filter.value, filter.key);
      }
    });

    useJobFilter.getState().jobFilterApply.forEach((filter) => {
      if (!currentSubjectFilters.includes(filter.value)) {
        removeJobFilter(filter.value, filter.key);
      }
    });

    // Add new filters that are selected
    currentGradeFilters.forEach((grade) => {
      const gradeLabel = allGrade?.find((g) => g.value === grade)?.label ?? '';
      if (
        !useJobFilter
          .getState()
          .jobFilter.map((filter) => filter.value)
          .includes(grade)
      ) {
        setJobFilter({
          value: grade,
          key: 'grade',
          label: gradeLabel,
        });
      }
    });

    currentSubjectFilters.forEach((subject) => {
      const subjectLabel =
        allSubject?.find((s) => s.value === subject)?.label ?? '';
      if (
        !useJobFilter
          .getState()
          .jobFilterApply.map((filter) => filter.value)
          .includes(subject)
      ) {
        setJobFilter({
          value: subject,
          key: 'subject',
          label: subjectLabel,
        });
      }
    });

    onClose();
  };

  return (
    <Drawer isOpen={isOpen} size={'md'} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter Job</DrawerHeader>

        <FormProvider {...filterFormMethods}>
          <DrawerBody>
            <Flex gap={4} flexDirection="column">
              <FormField label="Grade" error={errorsFilter.grade?.message}>
                <FrameWorkDropdown
                  options={allGrade}
                  isLoading={false}
                  isMulti
                  value={selectedGrades}
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions?.map(
                      (option) => option.value,
                    );
                    setValueFilter('grade', selectedValues, {
                      shouldDirty: true,
                    });
                    triggerFilter('grade');
                  }}
                  placeholder={'Select Grades'}
                />
              </FormField>
              <FormField label="Subject" error={errorsFilter.subject?.message}>
                <FrameWorkDropdown
                  options={allSubject}
                  value={selectedSubjects}
                  isLoading={false}
                  isMulti
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions?.map(
                      (option) => option.value,
                    );
                    setValueFilter('subject', selectedValues, {
                      shouldDirty: true,
                    });
                    triggerFilter('subject');
                  }}
                  placeholder={'Select Subject'}
                />
              </FormField>
            </Flex>
          </DrawerBody>
        </FormProvider>

        <DrawerFooter>
          <Flex gap={2}>
            <Button onClick={handleSaveFilter} variant="primary">
              Save
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setValueFilter('grade', []);
                setValueFilter('subject', []);
                clearJobFilter();
              }}
            >
              Clear All
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterJob;
