package dev.remito.color;

import dev.remito.exception.AlreadyExistsException;
import dev.remito.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorService {
	
	private final ColorRepository colorRepository;
	
	public List<ColorDto> findAll() {
		return colorRepository.findAll().stream()
			.map(ColorDto::from)
			.toList();
	}
	
	@Transactional
	public ColorDto create(ColorRequest request) {
		if (colorRepository.existsByName(request.name())) {
			throw new AlreadyExistsException("Color already exists: " + request.name());
		}
		Color color = Color.builder()
			.name(request.name())
			.hexCode(request.hexCode())
			.build();
		return ColorDto.from(colorRepository.save(color));
	}
	
	@Transactional
	public ColorDto update(Long id, ColorRequest request) {
		Color color = colorRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Color not found: " + id));
		color.setName(request.name());
		color.setHexCode(request.hexCode());
		return ColorDto.from(colorRepository.save(color));
	}
	
	@Transactional
	public void delete(Long id) {
		if (!colorRepository.existsById(id)) {
			throw new ResourceNotFoundException("Color not found: " + id);
		}
		colorRepository.deleteById(id);
	}
}
