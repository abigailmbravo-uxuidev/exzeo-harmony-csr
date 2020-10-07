import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export async function fetchNotes(notesQuery, returnUrl) {
  try {
    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.note.getNotes',
      data: { data: notesQuery }
    };
    const response = await serviceRunner.callService(config, returnUrl);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchFiles(filesQuery, returnUrl) {
  try {
    const config = {
      service: 'file-index',
      method: 'GET',
      path: `v1/fileindex/${filesQuery}`
    };
    const response = await serviceRunner.callService(config, returnUrl);
    return response;
  } catch (error) {
    throw error;
  }
}
