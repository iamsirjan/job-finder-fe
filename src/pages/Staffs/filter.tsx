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
  Input,
} from '@chakra-ui/react';
import FormField from 'components/form/FormField';
import FrameWorkDropdown from 'components/select';
import { useMemo, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useGetAllGradeList } from 'service/master/service-grade';
import { useGetAllSubjectList } from 'service/master/service-subject';
import { useJobFilter } from './state';
import { useCommonStore } from 'state/common.state';

interface IFilter {
  grade: string[];
  subject: string[];
  salary_high: string;
  salary_low: string;
}

const FilterJob = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const grade = useGetAllGradeList();
  const [search, setSearch] = useState('');

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
  const salary_high = watchFilter('salary_high');
  const salary_low = watchFilter('salary_low');
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

    if (salary_high) {
      setJobFilter({
        value: salary_high,
        key: 'salary_high',
        label: salary_high,
      });
    }

    if (salary_low) {
      setJobFilter({
        value: salary_low,
        key: 'salary_low',
        label: salary_low,
      });
    }

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

    useCommonStore.getState().setSearch(search);
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
              <FormField label="Title">
                <Input
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  size={'md'}
                  value={search}
                />
              </FormField>
              <FormField
                label="Max salary"
                error={errorsFilter.salary_high?.message}
              >
                <Input
                  onChange={(e) => {
                    setValueFilter('salary_high', e.target.value);
                  }}
                  name="salary_high"
                  size={'md'}
                  type="number"
                />
              </FormField>
              <FormField
                label="Min salary"
                error={errorsFilter.salary_low?.message}
              >
                <Input
                  onChange={(e) => {
                    setValueFilter('salary_low', e.target.value);
                  }}
                  name="salary_low"
                  size={'md'}
                  type="number"
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
                setValueFilter('salary_high', '');
                setValueFilter('salary_low', '');
                useCommonStore.getState().setSearch('');
                setSearch('');
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
