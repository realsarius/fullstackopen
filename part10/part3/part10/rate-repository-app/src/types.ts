export interface Repository {
    id: string;
    fullName: string;
    description: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number | null;
    reviewCount: number;
    ownerAvatarUrl: string;
    createdAt: string;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
}

export interface RepositoryListResponse {
    repositories: {
        totalCount: number;
        edges: {
            node: Repository;
            cursor: string;
        }[];
        pageInfo: PageInfo;
    };
}

export interface RepositoryItemProps {
    title: string;
    description: string;
    language: string;
    forksCount: number;
    stargazersCount: number;
    ratingAverage: number | null;
    reviewCount: number;
    ownerAvatarUrl: string;
    createdAt: string;
}

export interface SignInMutationResponse {
    authenticate: {
        accessToken: string;
    };
}