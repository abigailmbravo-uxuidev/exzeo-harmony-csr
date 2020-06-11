import { useEffect, useState } from 'react';
import { fetchDiaryOptions, getDiaryAssigneeOptions } from './data';

/**
 *
 * @returns {{loaded: boolean, diaryOptions: {}}}
 */
export const useFetchDiaryOptions = () => {
  const [diaryOptions, setDiaryOptions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getDiaryOptions = async () => {
      setLoaded(false);
      try {
        const diaryOptions = await fetchDiaryOptions();

        console.log(diaryOptions);
        setDiaryOptions(
          diaryOptions && Array.isArray(diaryOptions.reasons)
            ? diaryOptions.reasons
            : []
        );
      } catch {
        setDiaryOptions([]);
      }
      setLoaded(true);
    };
    getDiaryOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { diaryOptions, loaded };
};

/**
 *
 * @param userProfile
 * @returns {{loaded: boolean, assigneeAnswers: *[]}}
 */
export const useFetchAssigneeAnswers = userProfile => {
  const [assigneeAnswers, setAssigneeAnswers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getAssigneeAnswers = async () => {
      setLoaded(false);
      try {
        const answers = await getDiaryAssigneeOptions(userProfile);
        setAssigneeAnswers(answers);
      } catch {
        setAssigneeAnswers([]);
      }
      setLoaded(true);
    };
    getAssigneeAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  return { assigneeAnswers, loaded };
};
