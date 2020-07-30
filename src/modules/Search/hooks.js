import { useEffect, useState } from 'react';
import {
  fetchDiaryOptions,
  getDiaryAssigneeOptions,
  getUIQuestions
} from './data';
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

export function useFetchPolicyStatus() {
  const [statusList, setStatusList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getPolicyStatusList = async () => {
      setLoaded(false);
      try {
        const questions = await getUIQuestions('searchCSR');
        const result =
          questions.find(q => q.name === 'policyStatus')?.answers || [];
        setStatusList(result);
      } catch {
        setStatusList([]);
      }
      setLoaded(true);
    };
    getPolicyStatusList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { statusList, loaded };
}

export function useFetchQuoteState() {
  const [quoteStateList, setQuoteStateList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getQuoteStateList = async () => {
      setLoaded(false);
      try {
        const questions = await getUIQuestions('searchCSR');
        const result =
          questions.find(q => q.name === 'quoteState')?.answers || [];
        setQuoteStateList(result);
      } catch {
        setQuoteStateList([]);
      }
      setLoaded(true);
    };
    getQuoteStateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { quoteStateList, loaded };
}
