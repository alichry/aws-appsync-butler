import { readdirSync } from 'fs';
import { DirectoryFileDefinition, ResolverDirectoryFlags } from "./types";
import { DirectoryValidationError } from "./errors";

/**
 * Validates a resolver directory path and return its files.
 * @param directoryPath path to the resolver directory
 * @param unitResolverFileNames An array of file definitions representing the 
 *  list of required and optional files of a unit resolver directory
 * @param pipelineResolverFileNames An array of file definitions representing the
 *  list of required and optional files of a pipeline resolver directory
 * @returns A list of file names in the validated resolver directory.
 */
export const validateResolverDirectory = (
    directoryPath: string,
    unitResolverFileDefs: DirectoryFileDefinition[],
    pipelineResolverFileDefs: DirectoryFileDefinition[],
): string[] => {
    const files = getDirectoryFiles(directoryPath, "resolver");
    const flags = getResolverDirectoryFlags(
        files,
        unitResolverFileDefs.map(d => d.name),
        pipelineResolverFileDefs.map(d => d.name)
    );
    if (flags === ResolverDirectoryFlags.HasUnitAndPipelineResolverFiles) {
        throw new DirectoryValidationError(
            "The resolver directory is invalid. " +
            "Reason: overlapping file types.",
            directoryPath
        );
    }
    if (flags === ResolverDirectoryFlags.HasUnitResolverFiles) {
        validateDirectory(
            directoryPath,
            files,
            "unit resolver",
            unitResolverFileDefs
        );
        return files;
    }
    if (flags === ResolverDirectoryFlags.HasPipelineResolverFiles) {
        validateDirectory(
            directoryPath,
            files,
            "pipeline resolver",
            pipelineResolverFileDefs
        );
        return files;
    }
    throw new DirectoryValidationError(
        "Resolver directory is invalid. Reason: No significant files were found.",
        directoryPath
    );
}

/**
 * Validate a function directory and return its files.
 * @param directoryPath path to function directory
 * @param functionFileDefs A list of file definitions representing required
 *  and optional files of a function directory
 * @returns A list of file names in the validated function directory.
 */
export const validateFunctionDirectory = (
    directoryPath: string,
    functionFileDefs: DirectoryFileDefinition[],
): string[] => {
    const files = getDirectoryFiles(directoryPath, "function");
    validateDirectory(
        directoryPath,
        files,
        "function",
        functionFileDefs,
    );
    return files;
}

const getDirectoryFiles = (
    directoryPath: string,
    directoryType: "resolver" | "function"
): string[] => {
    const entries = readdirSync(
        directoryPath,
        { withFileTypes: true, encoding: "ascii" }
    );
    const files = entries.filter(e => e.isFile()).map(e => e.name);
    if (entries.filter(e => e.isDirectory()).length > 0) {
        throw new DirectoryValidationError(
            `The ${directoryType} directory is invalid. Reason: ` +
            `subdirectories are not allowed in ${directoryType} directories`,
            directoryPath
        );
    }
    return files;
}

const getResolverDirectoryFlags = (
    directoryFiles: string[],
    unitResolverFileNames: string[],
    pipelineResolverFileNames: string[]
): ResolverDirectoryFlags => {
    let flags = 0;
    for (const file of directoryFiles) {
        if (flags === 3) {
            break;
        }
        const isUnitFile = unitResolverFileNames.indexOf(file) !== -1 ? 1 : 0;
        const isPipelineFile = pipelineResolverFileNames.indexOf(file) !== -1 ? 1 : 0;
        if ((isUnitFile ^ isPipelineFile) === 0) {
            // common or insignificant file.
            continue;
        }
        if (isUnitFile) {
            flags |= 1;
        } else {
            flags |= 2;
        }
    }
    return flags;
}

const validateDirectory = (
    directoryPath: string,
    directoryFiles: string[],
    directoryType: "unit resolver" | "pipeline resolver" | "function",
    fileDefs: DirectoryFileDefinition[],
): void => {
    fileDefs.forEach(({ name, required }) => {
        if (required && directoryFiles.indexOf(name) === -1) {
            throw new DirectoryValidationError(
                `The ${directoryType} directory is invalid. Reason: ` +
                `file ${name} is required.`,
                directoryPath
            );
        }
    });
}