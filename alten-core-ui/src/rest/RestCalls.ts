import axios, { AxiosRequestConfig } from 'axios';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';

const ALTENPROJECT_API_URL = '/api';
const apiVersion = 'v1';

function computeConfig(
    config: AxiosRequestConfig | null | undefined,
): AxiosRequestConfig {
    const token = null;

    if (CommonValidationUtils.isFalsy(token)) {
        return config;
    }
    if (CommonValidationUtils.isTruthy(config)) {
        return {
            ...config,
            headers: {
                ...(config.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        };
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

function computeDownloadConfig(
    config: AxiosRequestConfig | null | undefined,
): AxiosRequestConfig {
    if (CommonValidationUtils.isTruthy(config)) {
        return {
            ...config,
            responseType: 'blob',
        };
    }
    return {
        responseType: 'blob',
    };
}

function GET(suffix: string, config?: AxiosRequestConfig) {
    return axios
        .get(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function DELETE(suffix: string, config?: AxiosRequestConfig) {
    return axios
        .delete(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function POST(suffix: string, body, config?: AxiosRequestConfig) {
    return axios
        .post(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            body,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function POST_FORM(suffix: string, body, config?: AxiosRequestConfig) {
    return axios
        .postForm(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            body,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function PUT(suffix: string, body, config?: AxiosRequestConfig) {
    return axios
        .put(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            body,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function PATCH(suffix: string, body, config?: AxiosRequestConfig) {
    return axios
        .patch(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            body,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function PATCH_FORM(suffix: string, body, config?: AxiosRequestConfig) {
    return axios
        .patchForm(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            body,
            computeConfig(config),
        )
        .then(payload => payload.data);
}

function getFileName(response) {
    const contentDisposition = response.headers['content-disposition'];
    if (CommonValidationUtils.isFalsy(contentDisposition)) {
        return 'Unnamed_file';
    }

    const fileNames = contentDisposition.split('filename=');

    if (fileNames.length < 2) {
        return 'Unnamed_file';
    }

    const [_, fileName] = fileNames;

    return fileName;
}

function downloadCallback(response) {
    const fileName = getFileName(response);

    // // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTML element with href to file & click
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

    return response;
}

function DOWNLOAD_GET(suffix: string, config?: AxiosRequestConfig) {
    return axios
        .get(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            computeDownloadConfig(computeConfig(config)),
        )
        .then(downloadCallback);
}

function DOWNLOAD_POST(suffix: string, body, config?: AxiosRequestConfig) {
    return axios
        .post(
            `${ALTENPROJECT_API_URL}/${apiVersion}${suffix}`,
            body,
            computeDownloadConfig(computeConfig(config)),
        )
        .then(downloadCallback);
}

export {
    DELETE,
    DOWNLOAD_GET,
    DOWNLOAD_POST,
    GET,
    PATCH,
    PATCH_FORM,
    POST,
    POST_FORM,
    PUT
};

