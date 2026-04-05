package dev.remito.color;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static dev.remito.config.CacheConfig.CACHE_COLORS;

@Service
@RequiredArgsConstructor
public class ColorService {
	
	private final ColorRepository colorRepository;
	private final ColorMapper colorMapper;
	
	@Cacheable(value = CACHE_COLORS)
	public List<ColorDto> findAll() {
		return colorRepository.findAll().stream()
			.map(colorMapper::toDto)
			.toList();
	}
	
	@CacheEvict(value = CACHE_COLORS, allEntries = true)
	@Transactional
	public ColorDto create(ColorRequest request) {
		if (colorRepository.existsByName(request.name())) {
			throw new AlreadyExistsException("Color already exists: " + request.name());
		}
		Color color = Color.builder()
			.name(request.name())
			.hexCode(request.hexCode())
			.build();
		
		Color saved = colorRepository.save(color);
		return colorMapper.toDto(saved);
	}
	
	@CacheEvict(value = CACHE_COLORS, allEntries = true)
	@Transactional
	public ColorDto update(Long id, ColorRequest request) {
		Color color = colorRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Color not found: " + id));
		color.setName(request.name());
		color.setHexCode(request.hexCode());
		
		Color saved = colorRepository.save(color);
		return colorMapper.toDto(saved);
	}
	
	@CacheEvict(value = CACHE_COLORS, allEntries = true)
	@Transactional
	public void delete(Long id) {
		if (!colorRepository.existsById(id)) {
			throw new ResourceNotFoundException("Color not found: " + id);
		}
		colorRepository.deleteById(id);
	}
}
