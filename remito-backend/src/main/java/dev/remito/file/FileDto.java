package dev.remito.file;

public record FileDto(
	String key,
	String url,
	String contentType,
	long size,
	String originalName
) {}
