const requests = {

    // Plan 관련 API
    fetchPlan: '/plan',
    // Todo 관련 API
    fetchTodo: '/todo',
    // LifePattern 관련 API
    fetchLife: '/life',
    // Auth 관련 API
    fetchLogin: '/auth/login',      
    fetchLogout: '/auth/logout',    
    fetchSignup: '/auth/signup',
    fetchWithdrawal: '/auth/withdrawal', 
    fetchReissue: '/auth/reissue',
    // Importance 관련 API
    fetchWeight: '/importance',
    // Member 관련 API
    fetchMember: '/member',
    // Recommend 관련 API
    fetchRecommend: '/recommend',
    // Category 관련 API
    fetchCategory: '/category',
};

export default requests;
