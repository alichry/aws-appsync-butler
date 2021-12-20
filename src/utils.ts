import { readdirSync } from 'fs';

/**
 * Returns a list of *.graphql file paths in the specified directory
 * @param directory path to the directory containing .graphql files
 * @returns An array of *.graphql file paths in the form of ${directory}/*.graphql
 */
export const getGraphqlFiles = (directory: string): string[] => {
    const ents = readdirSync(directory, { withFileTypes: true });
    return ents.filter(e => e.isFile() && e.name.endsWith(".graphql"))
        .map(e => `${directory}/${e.name}`);
}