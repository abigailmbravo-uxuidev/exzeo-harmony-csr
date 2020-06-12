import { useEffect, useState } from 'react';
import { fetchDiaryOptions, getDiaryAssigneeOptions } from './data';
import { formatDiaryOptions } from './utilities';

/**
 * Z
 * @returns {{loaded: boolean, reasons: *[], tags: *[]}}
 */
export const useFetchDiaryOptions = () => {
  const [tags, setTags] = useState([]);
  const [reasons, setReasons] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getDiaryOptions = async () => {
      setLoaded(false);
      try {
        const result = await fetchDiaryOptions();
        const { tags, reasons } = formatDiaryOptions(result);
        setTags(tags);
        setReasons(reasons);
      } catch {
        setTags([]);
        setReasons([]);
      }
      setLoaded(true);
    };
    getDiaryOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { tags, reasons, loaded };
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
