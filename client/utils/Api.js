import superagent from 'superagent';

export const getProjectList = () => {
    return superagent.get('/project_list/list')
}

export const setProjectVersion = (name, branch, version) => {
    console.log('设置项目当前版本');
    
    if(!name || !branch || !version) {
        var err = '设置项目当前版本，参数 name, branch, version 不能为空.';
        throw new Error(err);
    }

    return superagent
            .post('/project_list/set_version')
            .send({
                name: name,
                branch: branch,
                version: version
            })
}

export const queryCurrentVersion = (name, branch) => {
    console.log('查询项目当前版本');

    return superagent
        .get('/project_list/query_version')
        .query({
            name: name,
            branch: branch
        })
}

export const insertProject = (name, branch) => {
    console.log('添加项目');

    return superagent
        .post('/project_list/insert_project')
        .send({
            name: name,
            branch: branch
        })
}

export const insertVersion = (name, branch, version) => {
    console.log('添加版本');

    return superagent
        .post('/project_list/insert_version')
        .send({
            name: name,
            branch: branch,
            version: version
        })
}

export default {
    getProjectList: getProjectList,
    setProjectVersion: setProjectVersion,
    queryCurrentVersion: queryCurrentVersion,
    insertProject: insertProject,
    insertVersion: insertVersion
}
