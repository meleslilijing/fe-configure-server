import superagent from 'superagent';

export const getProjectList = () => {
    console.log('获得项目列表');

    return superagent.get('/project_list/list')
}

export const setProjectVersion = (name, version) => {
    console.log('设置项目当前版本');
    
    return superagent
            .post('/project_list/set_version')
            .send({
                name: name,
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
    console.log('添加项目版本');

    return superagent
        .post('/project_list/insert_project')
        .send({
            name: name,
            branch: branch
        })
}

export default {
    getProjectList: getProjectList,
    setProjectVersion: setProjectVersion,
    queryCurrentVersion: queryCurrentVersion,
    insertProject: insertProject
}
